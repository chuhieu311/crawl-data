function getPrice(htmlContent, option) {
    this.setTikiPage(htmlContent);
    this.setLazadaPage(htmlContent);
    this.setFahasaPage(htmlContent);
    this.getPriceShoppePage(htmlContent);
    this.getPriceVinabookPage(htmlContent);
    // switch (option) {
    //     case 1:
    //         this.setTikiPage(htmlContent);
    //         break;
    //     case 2:
    //         this.setLazadaPage(htmlContent);
    //         break;
    //     case 3:
    //         this.setFahasaPage(htmlContent);
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

function getPriceVinabookPage(content) {}