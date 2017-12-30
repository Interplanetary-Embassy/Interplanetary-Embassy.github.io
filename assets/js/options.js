/*
 * 
 *  BloqPress v0.1
 *  http://bloq.press
 *
 *  Designed, Developed and Maintained by Neuroware.io
 *  All Work Released Under MIT License
 *  
 */

var bloqpress_options = {
    v: "0.1",
    id: "bloqpress",
    app_id: "bloqpress-v010",
    loader_id: "loading-wrapper",
    account_poll: false,
    install: false,
    skip_config: true,
    public: false, 
    security: false,
    role: "admin",
    theme: "bloqpress",
    element: "body",
    less: false,
    test: false,
    refresh: true,
    cascade: true,
    html_base: "html/",
    data_base: "data/",
    core_base: "core/",
    theme_base: "themes/",
    slug_base_logout: "public",
    dependency_base: "js/dependencies/",
    module_base: "js/modules/",
    page_base: "index",
    slug_base: "dashboard",
    api_service: "blockcypher",
    default_api: "blockcypher",
    css: ['bootstrap', 'tables', 'bloqpress'],
    dependencies: ['effects', 'bootstrap.min', 'crypto', 'sha3', 'bitcoinjs-lib', 'mustache', 'tables', 'qrcode', 'charts', 'charts.config'],
    modules: ['api', 'filters', 'templates', 'blockchains', 'bloqpress'],
    text: {
        en: {
            app: {
                title: "Bloq.Press"
            }
        }
    },
    schema: {
        credit: [0],
        user: {
            key: [1],
            name: [1, 1],
            email: [1, 2],
            username: [1, 3]
        },
        users: {
            key: [2]
        },
        category: {
            key: [3],
            indexes: {
                name: [3, 1]
            },
            parent: [3, 'txid', 2]
        },
        post: {
            key: [4],
            indexes: {
                title: [4, 1]
            },
            content: [4, 'txid', 2],
            category: [4, 'txid', 3]
        }
    },
    store: false,
    cache: false,
    base_url: "",
    content_id: "main-content",
    navigation_id: "menu",
    mobile_nav_id: "mobile-footer",
    bootstrap: false,
    buttons: { 
        classes: [
            "page"
        ],
        ids: false
    },
    styles: false,
    timeouts: {
        default: 750,
        loader: 750,
        isotope_delay: 750,
        clear_forms: 50, // Related to a strange firefox bug
        delayed_init: 750, // Are we sure we need this? Was 3000
        bp_buttons_submit_payment: 750, // Are we sure we need this? Was 6000
        bp_forms_switch_address: 750, // Are we sure we need this? Was 6000
        bp_widgets_request: 750, // Are we sure we need this? Was 6000
        es_buttons_confirm: 750, // Are we sure we need this? Was 6000
        es_ready_iso_delay: 750, // Are we sure we need this? Was 6000
        es_forms_edit: 750, // Are we sure we need this? Was 6000
        es_forms_record: 750, // Are we sure we need this? Was 6000
        es_instances_setup: 750, // Are we sure we need this? Was 6000
        es_txs_commit: 750, // Are we sure we need this? Was 6000
        es_txs_confirm: 750, // Are we sure we need this? Was 6000
        es_txs_prepare: 750, // Are we sure we need this? Was 6000
    },
    confirmations: {
        default: 0
    },   
    styles: false,
    blockchains: {
        btct: {
            blockchain: "Bitcoin (Testnet)",
            lib: "bitcointestnet",
            apis: {
                blockcypher: "http://api.blockcypher.com/v1/btc/test3/"
            },
            fee: 0.0001,
            op_return: true,
            op_limit: 80
        },
        dasht: {
            blockchain: "DashPay (Testnet)",
            lib: "dashpaytestnet",
            apis: {
                
            },
            fee: 0.0001,
            op_return: true,
            op_limit: 80
        },
        doget: {
            blockchain: "Dogecoin (Testnet)",
            lib: "dogecointestnet",
            apis: {
                
            },
            fee: 1,
            op_return: true,
            op_limit: 80
        },
        ltct: {
            blockchain: "Litecoin (Testnet)",
            lib: "litecointestnet",
            apis: {
                
            },
            fee: 0.001,
            op_return: true,
            op_limit: 80
        },
        btc: {
            blockchain: "Bitcoin",
            lib: "bitcoin",
            apis: {
                blockcypher: "http://api.blockcypher.com/v1/btc/main/"
            },
            fee: 0.0001,
            op_return: true,
            op_limit: 80
        },
        dash: {
            blockchain: "DashPay",
            lib: "dashpay",
            apis: {
                
            },
            fee: 0.0001,
            op_return: true,
            op_limit: 80
        },
        doge: {
            blockchain: "Dogecoin",
            lib: "dogecoin",
            apis: {
                blockcypher: "http://api.blockcypher.com/v1/doge/main/"
            },
            fee: 1,
            op_return: true,
            op_limit: 80
        },
        ltc: {
            blockchain: "Litecoin",
            lib: "litecoin",
            apis: {
                
            },
            fee: 0.001,
            op_return: true,
            op_limit: 80
        }
    },
    apis: {
        available: {
            blockcypher: "BlockCypher"
        },
        defaults: {
            blockcypher: {
                async: false,
                functions: {
                    to: {
                        address: "addrs/$call/full",
                        addresses: "addrs/$call/full",
                        block: "blocks/",
                        op_return: "txs/",
                        op_returns: "addrs/$call/full",
                        relay: "txs/push/",
                        relay_param: "tx",
                        relay_json: "tx",
                        transaction: "txs/",
                        transactions: "addrs/$call/full",
                        unspents: "addrs/$call?unspentOnly=true&includeScript=true"
                    },
                    from: {
                        address: {
                            key: "",
                            address: "address",
                            hash: "",
                            tx_count: "final_n_tx",
                            received: "total_received",
                            balance: "final_balance"
                        },
                        addresses: {
                            key: "",
                            address: "address",
                            hash: "",
                            tx_count: "final_n_tx",
                            received: "total_received",
                            balance: "final_balance"
                        },
                        block: {
                            key: "",
                            height: "height",
                            hash: "hash",
                            prev: "prev_block",
                            next: "",
                            next: "",
                            tx_count: "n_tx",
                            time: "[time, utctoepoch]"
                        },
                        op_return: {
                            key: "",
                            inner: "",
                            txid: "hash",
                            data: "data_string"
                        },
                        op_returns: {
                            key: "",
                            inner: "txs",
                            txid: "hash",
                            data: "data_string"
                        },
                        relay: {
                            txid: "hash",
                            inner: "tx"
                        },
                        transaction: {
                            key: "",
                            txid: "hash",
                            size: "size",
                            block: "block_height",
                            time: "[received, utctoepoch]",
                            input: "[total, +, fees, int]",
                            output: "total",
                            value: "[total, -, fees, int]",
                            fees: "fees",
                            data: "transactions.outputs.data_string"
                        },
                        transactions: {
                            key: "",
                            inner: "txs",
                            txid: "hash",
                            size: "size",
                            block: "block_height",
                            time: "[received, utctoepoch]",
                            input: "[total, +, fees, int]",
                            output: "total",
                            value: "[outputs, value]",
                            fees: "fees",
                            data: "transactions.outputs.data_string",
                            transactions: "txs"
                        },
                        unspents: {
                            key: "",
                            inner: "txrefs",
                            inner_unconfirmed: "unconfirmed_txrefs",
                            confirmations: "confirmations",
                            txid: "tx_hash",
                            index: "tx_output_n",
                            value: "value",
                            script: "script"
                        }
                    }
                }
            }
        }
    }
};

if(typeof bp_secrets != 'undefined')
{
    bloqpress_options.keys = bp_secrets;
}

var bloqpress_defaults = JSON.stringify(bloqpress_options);