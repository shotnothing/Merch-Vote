import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Card, CardContent } from "@/components/ui/card"
import '@/swiper.css' // Some issue swiper's backward compatibility
import CardDisplay from "./card-display"
import { useOptionsStore, useInstanceStore } from "@/components/views/instance-view"
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react"
import { LETTERS, EXISTING_FILES, LANDSCAPE_LETTERS } from "@/App"
import { cn } from "@/lib/utils"

function HeaderPage() {
  return (
    <Card className="h-full bg-black rounded-none border-none">
      <CardContent className="flex items-end justify-center p-2 h-full">
        <div className="flex flex-col items-center gap-2">
          <div className="text-white text-2xl">I prefer the top design</div>
          <ChevronDownIcon className="w-8 h-8 text-white" />
        </div>
      </CardContent>
    </Card>
  )
}

function FooterPage() {
  return (
    <Card className="h-full bg-black rounded-none border-none">
      <CardContent className="flex items-start justify-center p-2 h-full">
        <div className="flex flex-col items-center gap-2">
          <ChevronUpIcon className="w-8 h-8 text-white" />
          <div className="text-white text-2xl">I prefer the bottom design</div>
        </div>
      </CardContent>
    </Card>
  )
}

function ComparisonPage({ index }: { index: number | null }) {
  if (index === null) {
    return <div className="h-full bg-[#1e1e1e] rounded-none border-none">
      <div className="flex items-center justify-center p-6 h-full">
        <div className="text-white text-2xl">No more designs to compare</div>
      </div>
    </div>
  }

  const { role, side, mode } = useOptionsStore();
  const letter = LETTERS[index];
  const image = `/tags/tag.${letter}.${role}.${side}.png`

  return (
    <Card className="h-full bg-[#1e1e1e] rounded-none border-none">
      <CardContent className="flex items-center justify-center p-6 h-full">
        {/* <div className="text-white text-2xl">{letter}</div> */}

        {EXISTING_FILES.includes(image.replace('/tags/', '')) ?
          mode === '2D' ?
            <img src={image} className="w-full h-full object-contain" />
            :
            <CardDisplay image={image} portrait={LANDSCAPE_LETTERS.includes(letter)} />
          :
          side == 'f' ?
            <div className="text-white text-2xl text-center">I didn't make this yet</div>
            :
            <div className="text-white text-2xl text-center">I didn't make this yet, or its the same as the front</div>
        }


      </CardContent>
    </Card>
  )
}

export function ComparisonSwiper() {
  const { pairings, results, setResults, setPairings } = useInstanceStore();
  const { mode } = useOptionsStore();

  const topIndex = results[pairings[0].competitors[0]];
  const bottomIndex = results[pairings[0].competitors[1]];

  const [debounce, setDebounce] = React.useState(true);

  return (
    <Swiper
      slidesPerView={2}
      direction="vertical"
      className={cn("h-full w-full", mode === '2D' ? '' : 'swiper-no-swiping')}
      initialSlide={1}

      onSlideChangeTransitionStart={(swiper) => {

        if (debounce) {
          setDebounce(false);
          return;
        }

        // Check if swipe was up
        if (swiper.activeIndex > swiper.previousIndex) {
          console.log('up')
          swiper.slideTo(1, 500, false)

          setResults({
            ...results,
            [pairings[0].label]: bottomIndex
          })
          console.log('Setting results', pairings[0].label, topIndex)

          setPairings(pairings.slice(1))
        }

        // Check if swipe was down
        else if (swiper.activeIndex < swiper.previousIndex) {
          console.log('down')
          swiper.slideTo(1, 500, false)

          setResults({
            ...results,
            [pairings[0].label]: topIndex
          })
          console.log('Setting results', pairings[0].label, topIndex)

          setPairings(pairings.slice(1))
        }

        console.log('CURRENT', pairings[0], results)
      }}
    >
      <SwiperSlide> <HeaderPage /> </SwiperSlide>
      <SwiperSlide> <ComparisonPage key={topIndex} index={topIndex} /> </SwiperSlide>
      <SwiperSlide> <ComparisonPage key={bottomIndex} index={bottomIndex} /> </SwiperSlide>
      <SwiperSlide> <FooterPage /> </SwiperSlide>
    </Swiper>
  )
}

export default ComparisonSwiper
