import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <section className="w-full py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2F6686]">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl text-gray-600 text-base sm:text-lg md:text-xl">
            Find answers to common questions about our Excel templates
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-left text-base md:text-lg font-medium cursor-pointer">
              Do I need to be an Excel expert to use these templates?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm sm:text-base">
              Not at all! Our templates are designed to be user-friendly for all skill levels. Each template comes with clear instructions, and most of the complex formulas are already set up for you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger className="text-left text-base md:text-lg font-medium cursor-pointer">
              Can I customize the templates to fit my specific needs?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm sm:text-base">
              All our templates are fully customizable. You can modify colors, add or remove sections, and adjust formulas to suit your specific requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-none">
            <AccordionTrigger className="text-left text-base md:text-lg font-medium cursor-pointer">
              What versions of Excel are your templates compatible with?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm sm:text-base">
              Our templates are compatible with Excel 2013 and newer versions, including Excel for Microsoft 365. We also provide alternative formats for Google Sheets users.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-none">
            <AccordionTrigger className="text-left text-base md:text-lg font-medium cursor-pointer">
              Do you offer refunds if I'm not satisfied?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm sm:text-base">
              Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, simply contact our support team for a full refund.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-none">
            <AccordionTrigger className="text-left text-base md:text-lg font-medium cursor-pointer">
              How do I receive the templates after purchase?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm sm:text-base">
              After completing your purchase, you'll receive an email with download links to your templates. You can also access all your purchased templates from your account dashboard at any time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}