const defaut_price = {
    finalPrice: 0,
    priceRegular: 0,
    sale: 0,
    url: "",
    status: 0 /*0: còn hàng, 1: hết hàng, 2: đăng ký*/
};
var price = defaut_price;

function getPrice(htmlContent, option) {
    // console.log(getPriceTikiPage(tiki));
    // console.log(getPriceLazadaPage(lazada));
    console.log(getPriceFahasaPage(fahasa));
    // getPriceShoppePage(htmlContent);
    // getPriceVinabookPage(htmlContent);
    // price = defaut_price;
    // switch (option) {
    //     case 1:
    //         this.getPriceTikiPage(htmlContent);
    //         break;
    //     case 2:
    //         this.getPriceLazadaPage(htmlContent);
    //         break;
    //     case 3:
    //         this.getPriceFahasaPage(htmlContent);
    //         break;
    //     case 4:
    //         this.getPriceShoppePage(htmlContent);
    //         break;
    //     case 5:
    //         this.getPriceVinabookPage(htmlContent);
    //         break;
    //     default:
    //         break
    // }
}

function getPriceTikiPage(content) {}

function getPriceLazadaPage(content) {}

function getPriceFahasaPage(content) {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(content, "text/html");
    var book = htmlDoc.querySelector("ul.products-grid > li");
    if (book) {
        var infoTmp = book.querySelector("p.special-price > .price");
        if (infoTmp) {
            price.finalPrice = infoTmp.textContent;
        }
        infoTmp = book.querySelector("p.old-price > .price");
        if (infoTmp) {
            price.priceRegular = infoTmp.textContent;
        }
        infoTmp = book.querySelector("span.p-sale-label");
        if (infoTmp) {
            price.sale = infoTmp.textContent;
        }
        infoTmp = book.querySelector("a.product-image");
        if (infoTmp) {
            price.url = infoTmp.href;
            if (price.url) {
                let removeIndex = price.url.indexOf("?");
                if (removeIndex > 0) { price.url = price.url.substring(0, removeIndex); }
            }
        }
        if (book.querySelector(".hethang") || book.querySelector(".product-hh")) {
            price.status = 1;
        }
    }
    return price;
}

function getPriceShoppePage(content) {}

function getPriceVinabookPage(content) {}