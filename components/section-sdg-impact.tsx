import Image from "next/image"

import {
  CardFooter,
  ImpactCard,
} from "@/components/ui/card"

// Downloaded from https://commons.wikimedia.org/wiki/File:Sustainable_Development_Goals.svg

export function SectionSGDImpact() {
  return (
    
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-6">
      <ImpactCard className="@container/card">
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
         <Image src="/goal3.svg" alt="Good Health and Well-Being" width="500" height="300" />
        </CardFooter>
      </ImpactCard>
      <ImpactCard className="@container/card">
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
         <Image src="/goal17.svg" alt="Good Health and Well-Being" width="500" height="300" />
        </CardFooter>
      </ImpactCard>
      <ImpactCard className="@container/card">
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
         <Image src="/goal8.svg" alt="Good Health and Well-Being" width="500" height="300" />
        </CardFooter>
      </ImpactCard>
      <ImpactCard className="@container/card">
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
         <Image src="/goal9.svg" alt="Good Health and Well-Being" width="500" height="300" />
        </CardFooter>
      </ImpactCard>
      <ImpactCard className="@container/card">
       <CardFooter className="flex-col items-start gap-1.5 text-sm">
         <Image src="/goal12.svg" alt="Good Health and Well-Being" width="500" height="300" />
        </CardFooter>
       </ImpactCard>
      
      <ImpactCard className="@container/card">
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
         <Image src="/goal13.svg" alt="Good Health and Well-Being" width="500" height="300" />
        </CardFooter>
      </ImpactCard>
    </div>
  )
}
