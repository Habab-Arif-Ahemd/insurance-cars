
import { PreviewQuoteResponse } from 'src/app/payload/responses/quotes/PreviewQuoteResponse';
import { CheckoutRequest } from 'src/app/models/checkout/CheckoutRequest';
import { PreviewPageQuoteProduct, PreviewPageQuote } from 'src/app/models/checkout/PreviewPageRequest';



export default class CheckoutUtils {

    /**
      * Construct Quotation Request
      */
    // orderedQuote: PreviewQuoteResponse;
    public static constructCheckoutRequest(orderedQuote: PreviewQuoteResponse): CheckoutRequest {


        let checkoutQuoteProduct: PreviewPageQuoteProduct = Object.assign({
            quotationProductId: orderedQuote.quoteInfo.products[0].quotationProductId,
            insurQuotationId: orderedQuote.quoteInfo.products[0].insurQuotationId,
            policyEffectiveDate: orderedQuote.quoteInfo.products[0].policyEffectiveDate,
            policyExpiryDate: orderedQuote.quoteInfo.products[0].policyExpiryDate,
            deductibleReferenceNo: orderedQuote.quoteInfo.products[0].deductibles[0].deductibleReferenceNo,
            productDeductibleId: orderedQuote.quoteInfo.products[0].deductibles[0].productDeductibleId,
            deductibleValue: orderedQuote.quoteInfo.products[0].deductibles[0].deductibleValue,
            policyPremium: orderedQuote.quoteInfo.products[0].deductibles[0].policyPremium,
            basePremium: orderedQuote.quoteInfo.products[0].deductibles[0].basePremium,
            taxableAmount: orderedQuote.quoteInfo.products[0].deductibles[0].taxableAmount,
            totalAdditionalBenefits: orderedQuote.quoteInfo.products[0].deductibles[0].totalAdditionalBenefits,
            totalDiscounts: orderedQuote.quoteInfo.products[0].deductibles[0].totalDiscounts,
            benefits: orderedQuote.quoteInfo.products[0].benefits,
        })

        let checkoutReqQuote: PreviewPageQuote = Object.assign({
            quotationReqtId: orderedQuote.quoteInfo.quotationReqtId,
            requestReferenceId: orderedQuote.quoteInfo.requestReferenceId,
            insuranceCompanyId: orderedQuote.quoteInfo.insuranceCompany.id,
            vehicleFKId: orderedQuote.vehicleInfo.vehicleFKId,
            quotationStartDate: orderedQuote.quoteInfo.quotationStartDate,
            quotationEndDate: orderedQuote.quoteInfo.quotationEndDate,
            product: checkoutQuoteProduct,
        })

        console.log("hhommmhhh" + checkoutReqQuote.insuranceCompanyId);
        console.log("hhmmhh" + checkoutQuoteProduct.productDeductibleId);
        let checkoutRequest: CheckoutRequest = Object.assign({
            quote: checkoutReqQuote,
            // checkoutRequest.vehicleInfo.vehicleId : orderedQuote.vehicleInfo.vehicleId,


        })
        return checkoutRequest
    }

}
