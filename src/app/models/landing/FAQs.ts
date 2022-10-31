export interface FAQ {
   question: string;
   answer: string;
   isAccordionToggled?: boolean;
}

export default class FAQs {
   public static readonly QAs: FAQ[] = [
      {
         question: 'What is APPlus and what service does it offer?',
         answer: 'GoNsure is an electronic platform authorized by SAMA and provides electronic comparison, purchase and insurance services electronically and is owned by a guarantor of insurance brokerage.'
      },
      {
         question: 'What includes the price of the insurance policy',
         answer: 'The price displayed is the total value of the insurance policy required.The price also includes taxes and fees in addition to the commission of the mediator and the deduction of the absence of claims after the verification of the star'
      },
      {
         question: 'How can I cancel?',
         answer: 'GoNsure does not cancel the policy and if you wish to cancel, you can check with the insurance company that issued the policy.'
      },
      {
         question: 'Is it safe to use a credit card with APPlus?',
         answer: 'GoNsure guarantees you a 100% secure payment experience through our payment partner PayFort, which encrypts payment details before transfer using the latest electronic encryption technology that meets the highest security standards. Credit card numbers are not stored on our systems, Take the card details by phone or email. '
      }
   ];
}
