import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Card, CardContent } from "@/components/ui/card"
import 'swiper/css'
import 'swiper/css/pagination'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

function HeaderPage({ tutorialProgress, transitioning }: { tutorialProgress: number, transitioning: boolean }) {
  if (transitioning) {
    return (
      <Card className="h-full bg-green-500 rounded-none border-none">
        <CardContent className="flex items-end justify-center p-2 h-full">
          <div className="flex flex-col items-center gap-2">
            <div className="text-white text-2xl">Good job!</div>
            <ChevronDownIcon className="w-8 h-8 text-white" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {tutorialProgress != 2 ? (
        <Card className="h-full bg-black rounded-none border-none">
          <CardContent className="flex items-end justify-center p-2 h-full">
            <div className="flex flex-col items-center gap-2">
              <div className="text-white text-2xl">I prefer the top design</div>
              <ChevronDownIcon className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="h-full bg-red-500 rounded-none border-none">
          <CardContent className="flex items-end justify-center p-2 h-full">
            <div className="flex flex-col items-center gap-2">
              <div className="text-white text-2xl">Wrong direction!</div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

function FooterPage({ tutorialProgress, transitioning }: { tutorialProgress: number, transitioning: boolean }) {
  if (transitioning) {
    return (
      <Card className="h-full bg-green-500 rounded-none border-none">
        <CardContent className="flex items-start justify-center p-2 h-full">
          <div className="flex flex-col items-center gap-2">
            <ChevronUpIcon className="w-8 h-8 text-white" />
            <div className="text-white text-2xl">Good job!</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {tutorialProgress != 1 ? (
        <Card className="h-full bg-black rounded-none border-none">
          <CardContent className="flex items-start justify-center p-2 h-full">
            <div className="flex flex-col items-center gap-2">
              <ChevronUpIcon className="w-8 h-8 text-white" />
              <div className="text-white text-2xl">I prefer the bottom design</div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="h-full bg-red-500 rounded-none border-none">
          <CardContent className="flex items-start justify-center p-2 h-full">
            <div className="flex flex-col items-center gap-2">
              <div className="text-white text-2xl">Wrong direction!</div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

function ComparisonPage({ index, tutorialProgress }: { index: number | null, tutorialProgress: number }) {
  if (index === null) {
    return (
      <div className="h-full bg-[#1e1e1e] rounded-none border-none">
        <div className="flex items-center justify-center p-6 h-full">
          <div className="text-white text-2xl">No more designs to compare</div>
        </div>
      </div>
    )
  }

  return (
    <Card className="h-full bg-[#1e1e1e] rounded-none border-none">
      <CardContent className="flex items-center justify-center p-6 h-full">

        {tutorialProgress == 1 && (
          <div className="
            z-20 text-white text-4xl absolute 
            flex flex-col items-center justify-center
              top-0 left-0 w-full h-1/3
          ">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="font-bold">{index == 0 ? 'Swipe Down!' : ''}</div>
              <div className="text-white text-xl"> {index == 0 ? 'Push off the 💩' : ''} </div>
            </div>
          </div>
        )}

        {tutorialProgress == 2 && (
          <div className="z-20 text-white text-4xl absolute 
            flex flex-col items-center justify-center
              top-0 left-0 w-full h-1/3
          ">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="font-bold">{index == 0 ? 'Swipe Up!' : ''}</div>
              <div className="text-white text-xl"> {index == 0 ? 'Push off the 💩' : ''} </div>
            </div>
          </div>
        )}

        {tutorialProgress != 1 && tutorialProgress != 2 && (
          <div className="z-20 absolute 
              top-0 left-0 w-full h-full
              bg-black bg-opacity-30
          ">
          </div>
        )}


        <div className={cn("flex flex-col items-center gap-8", tutorialProgress != 1 && tutorialProgress != 2 ? "blur-md" : "")}>
          {tutorialProgress < 3 ?
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.6,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-9xl"
              >
                {index === 0 ? '🤩' : '💩'}
              </motion.div>
            </motion.div>
            :
            <div className="text-9xl">
              {index === 0 ? '🤩' : '💩'}
            </div>
          }
        </div>
      </CardContent>
    </Card >
  )
}

export function TutorialComparisonSwiper({ tutorialProgress, setTutorialProgress }: { tutorialProgress: number, setTutorialProgress: (value: number) => void }) {
  const [transitioning, setTransitioning] = React.useState(false);
  
  return (
    <Swiper
      slidesPerView={2}
      direction="vertical"
      className={cn("h-full w-full", tutorialProgress >= 3 ? "swiper-no-swiping" : "")}
      initialSlide={1}

      onSlideChangeTransitionStart={(swiper) => {
        // Check if swipe was up
        if (swiper.activeIndex > swiper.previousIndex) {
          console.log('up')
          swiper.slideTo(1, 500, false)

          if (tutorialProgress == 2) {
            setTutorialProgress(3);

            setTransitioning(true);
            setTimeout(() => {
              setTransitioning(false);
            }, 500);
          }

        }

        // Check if swipe was down
        else if (swiper.activeIndex < swiper.previousIndex) {
          console.log('down')
          swiper.slideTo(1, 500, false)

          if (tutorialProgress == 1) {
            setTutorialProgress(2);

            setTransitioning(true);
            setTimeout(() => {
              setTransitioning(false);
            }, 500);
          }
        }
      }}
    >
      <SwiperSlide> <HeaderPage tutorialProgress={tutorialProgress} transitioning={transitioning}/> </SwiperSlide>
      <SwiperSlide> <ComparisonPage tutorialProgress={tutorialProgress} key={0} index={tutorialProgress == 2 ? 1 : 0} /> </SwiperSlide>
      <SwiperSlide> <ComparisonPage tutorialProgress={tutorialProgress} key={1} index={tutorialProgress == 2 ? 0 : 1} /> </SwiperSlide>
      <SwiperSlide> <FooterPage tutorialProgress={tutorialProgress} transitioning={transitioning}/> </SwiperSlide>
    </Swiper >
  )
}

export default TutorialComparisonSwiper
