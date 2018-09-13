export const arrPage = [{
        title: "Tiki",
        option: 1,
        frame: {
            data: {
                _s: "#chi-tiet tr",
                _d: [{
                    title: "td ~ td.last",
                    value: ".last"
                }]
            },
            imageUrl: "#product-magiczoom @ src",
            title: "#product-name",
            description: "#gioi-thieu"
        }
    },
    {
        title: "Lazada",
        option: 2,
        frame: {
            title: "#module_product_title_1 .pdp-product-title",
            imageUrl: "#module_item_gallery_1 img @ src",
            description: "#module_product_detail .detail-content",
            data: ["#module_product_detail .pdp-product-highlights li"]
        }
    },
    {
        title: "Fahasa",
        option: 3,
        frame: {
            title: "#product_addtocart_form .product-essential .col-md-7 h1",
            imageUrl: "#product_addtocart_form .product-essential img @ src",
            description: "#product_tabs_description_contents .std",
        }
    }
];