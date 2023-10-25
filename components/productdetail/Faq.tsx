import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Faq = () => {
  return (
    <div className="pt-10">
      <div className="text-black text-[1rem] font-['Poppins'] border-b pb-2 ">
        Frequently Ask Question
      </div>
      <div className="pt-5  flex flex-col px-64">
        {[1, 2, 3, 4, 5].map((item) => (
          <Accordion type="single" className="border-b " collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[1rem] max-md:text-lg max-sm:text-sm font-semibold font-['Poppins']">
                What is Unishop, and how does it relate to Pulse?
              </AccordionTrigger>
              <AccordionContent className="text-[0.9rem] max-sm:text-sm max-md:text-lg opacity-70 px-5">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  )
}

export default Faq
