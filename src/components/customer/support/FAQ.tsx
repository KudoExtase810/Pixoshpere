import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    const data = [
        {
            q: "How can I track my order?",
            a: "You can track your order by logging into your account and navigating to the order history section. There, you will find detailed information about the current status and location of your order.",
        },
        {
            q: "What payment methods do you accept?",
            a: "We accept a variety of payment methods, including credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment gateways. You can choose your preferred payment method during the checkout process.",
        },
        {
            q: "How do I return an item?",
            a: "If you're not satisfied with your purchase, you can initiate a return within 30 days of receiving your order. Simply go to the 'Returns' section on our website, follow the instructions, and we'll guide you through the return process.",
        },
        {
            q: "Is my personal information secure?",
            a: "Yes, we take the security of your personal information seriously. Our website uses encrypted connections to ensure the confidentiality of your data. We do not share your information with third parties without your consent. You can learn more about our privacy policy on our dedicated page.",
        },
    ];

    return (
        <section className="w-full" id="faq">
            <h2 className="styled">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible>
                {data.map((qa, idx) => (
                    <AccordionItem key={idx} value={qa.q}>
                        <AccordionTrigger>{qa.q}</AccordionTrigger>
                        <AccordionContent>{qa.a}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};

export default FAQ;
