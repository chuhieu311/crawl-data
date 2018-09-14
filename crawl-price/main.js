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
    // console.log(getPriceFahasaPage(fahasa));
    // console.log(getPriceShoppePage(shoppe));
    console.log(getPriceVinabookPage(vinabook));
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

function getPriceFahasaPage(content) {}

function getPriceShoppePage(content) {}

function getPriceVinabookPage(content) {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(content, "text/html");
    var book = htmlDoc.querySelector("td.compact > form");
    if (book) {
        var infoTmp = book.querySelector("span.price > span.price-num");
        if (infoTmp) {
            price.finalPrice = infoTmp.textContent;
        }
        infoTmp = book.querySelector(".thumb-discount-label.thumb-discount-label_is_inside");
        if (infoTmp) {
            price.sale = infoTmp.textContent;
        }
        if (price.sale == 0) {
            price.priceRegular = price.finalPrice
        } else {
            var sale = price.sale.replace("-", "").replace("%", "");
            price.priceRegular = parseFloat(price.finalPrice * 100 / (100 - sale)).toFixed(3);
        }
        infoTmp = book.querySelector("a.image-border");
        if (infoTmp) {
            price.url = infoTmp.href;
            if (price.url) {
                let removeIndex = price.url.indexOf("?");
                if (removeIndex > 0) { price.url = price.url.substring(0, removeIndex); }
            }
        }
        if (book.querySelector(".qty-out-of-stock")) {
            price.status = 1;
        }
    }
    return price;
}