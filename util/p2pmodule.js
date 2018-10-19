const libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const Mplex = require('libp2p-mplex')
const SECIO = require('libp2p-secio')
const PeerInfo = require('peer-info')
const MulticastDNS = require('libp2p-mdns')
const waterfall = require('async/waterfall')
const parallel = require('async/parallel')
const defaultsDeep = require('@nodeutils/defaults-deep')
const pull = require('pull-stream')
const Bootstrap = require('libp2p-railing')
const PeerId = require('peer-id')

const fs = require('fs')


class CollectorNode extends libp2p {
    constructor(_options) {
        const defaults = {
            modules: {
                transport: [TCP],
                streamMuxer: [Mplex],
                connEncryption: [SECIO],
                peerDiscovery: [MulticastDNS, Bootstrap]
            },
            config: {
                peerDiscovery: {
                    mdns: {
                        interval: 1000,
                        enabled: false,
                    },
                    bootstrap: {
                        interval: 1000,
                        enabled: false,
                        list: _options.bootstrapList
                    }
                },
                EXPERIMENTAL: {
                    pubsub: true
                }
            }
        }

        super(defaultsDeep(_options, defaults))
    }
}

module.exports = {
    sendFile: (sendPath) => {
        parallel([
            (cb) => {
                PeerId.createFromJSON(require('../app/resources/peer/nodeInfo.json'), (err, senderPeerId) => {
                    if (err) {
                        throw err
                    }
                    cb(null, senderPeerId)
                })
            },
            (cb) => {
                PeerId.createFromJSON(require('../app/resources/peer/storageInfo.json'), (err, receiverPeerId) => {
                    if (err) {
                        throw err
                    }
                    cb(null, receiverPeerId)
                })
            }
        ], (err, ids) => {
            if (err) {
                throw err
            }
            const peerSenderCN = new PeerInfo(ids[0])
            peerSenderCN.multiaddrs.add('/ip4/0.0.0.0/tcp/0')
            const nodeCN = new CollectorNode({
                peerInfo: peerSenderCN
            })

            const receiverSN = new PeerInfo(ids[1])
            receiverSN.multiaddrs.add('/ip4/192.168.1.12/tcp/10333') //Storage IP

            nodeCN.start((err) => {
                if (err) {
                    throw err
                }

                console.log("send CN started")

                nodeCN.dialProtocol(receiverSN, '/fileToSN', (err, conn) => {

                    if (err) {
                        throw err
                    }

                    //sendPath 선회하며 pull
                    // for (var i = 0; i < sendPath.length; i++) {
                        let data = fs.readFileSync(sendPath)
                        pull(pull.once(data), conn)
                    // }
                })
            })
        })
    }
}