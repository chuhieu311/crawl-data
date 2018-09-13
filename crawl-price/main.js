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
    console.log(getPriceLazadaPage(lazada));
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
    var arrBook = htmlDoc.getElementsByClassName("product-item search-div-product-item");
    if (arrBook && arrBook.length > 0) {
        var book = arrBook[0];
        var arrTmp = book.getElementsByClassName("final-price");
        if (arrTmp && arrTmp.length > 0) {
            price.finalPrice = arrTmp[0].textContent;
        }
        arrTmp = book.getElementsByClassName("price-regular");
        if (arrTmp && arrTmp.length > 0) {
            price.priceRegular = arrTmp[0].textContent;
        }
        arrTmp = book.getElementsByClassName("sale-tag sale-tag-square");
        if (arrTmp && arrTmp.length > 0) {
            price.sale = arrTmp[0].textContent;
        }
        arrTmp = book.getElementsByClassName("search-a-product-item");
        if (arrTmp && arrTmp.length > 0) {
            price.url = arrTmp[0].href;
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

function getPriceLazadaPage(content) {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(content, "text/html");
    var arrBook = htmlDoc.getElementsByTagName("div");
    if (arrBook && arrBook.length > 0) {
        var book = arrBook[0];
        var arrTmp = book.getElementsByClassName("c13VH6");
        if (arrTmp && arrTmp.length > 0) {
            price.finalPrice = arrTmp[0].textContent;
        }
        arrTmp = book.getElementsByClassName("c1-B2V");
        if (arrTmp && arrTmp.length > 0) {
            price.priceRegular = arrTmp[0].textContent;
        }
        arrTmp = book.getElementsByClassName("c1hkC1");
        if (arrTmp && arrTmp.length > 0) {
            price.sale = arrTmp[0].textContent;
        }
        arrTmp = book.querySelectorAll("div.cRjKsc>a")
        if (arrTmp && arrTmp.length > 0) {
            price.url = arrTmp[0].href;
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

function getPriceFahasaPage(content) {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(content, "text/html");
    var arrBook = htmlDoc.getElementsByClassName("product-item search-div-product-item");
    if (arrBook && arrBook.length > 0) {
        var book = arrBook[0];
    }
}

function getPriceShoppePage(content) {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(content, "text/html");
    var arrBook = htmlDoc.getElementsByClassName("product-item search-div-product-item");
    if (arrBook && arrBook.length > 0) {
        var book = arrBook[0];
    }
}

function getPriceVinabookPage(content) {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(content, "text/html");
    var arrBook = htmlDoc.getElementsByClassName("product-item search-div-product-item");
    if (arrBook && arrBook.length > 0) {
        var book = arrBook[0];
    }
};