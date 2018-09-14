const defaut_price = {
    finalPrice: 0,
    priceRegular: 0,
    sale: 0,
    url: "",
    status: 0 /*0: còn hàng, 1: hết hàng, 2: đăng ký*/
};
var price = defaut_price;

function getPrice(htmlContent, option) {
    console.log(getPriceTikiPage(tiki));
    // console.log(getPriceLazadaPage(lazada));
    // getPriceFahasaPage(htmlContent);
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

function getPriceTikiPage(content) {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(content, "text/html");
    var book = htmlDoc.querySelector(".product-item.search-div-product-item");
    if (book) {
        var infoTmp = book.querySelector(".final-price");
        if (infoTmp) {
            price.finalPrice = infoTmp.textContent;
        }
        infoTmp = book.querySelector(".price-regular");
        if (infoTmp) {
            price.priceRegular = infoTmp.textContent;
        }
        infoTmp = book.querySelector(".sale-tag.sale-tag-square");
        if (infoTmp) {
            price.sale = infoTmp.textContent;
        }
        infoTmp = book.querySelector(".search-a-product-item");
        if (infoTmp) {
            price.url = infoTmp.href;
            if (price.url) {
                let removeIndex = price.url.indexOf("?");
                price.url = price.url.substring(0, removeIndex);
            }
        }
        if (book.classList.contains("out-of-stock")) {
            price.status = 1;
        }
    }
    return price;
}

function getPriceLazadaPage(content) {}

function getPriceFahasaPage(content) {}

function getPriceShoppePage(content) {}

function getPriceVinabookPage(content) {}