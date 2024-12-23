import ComparisonSwiper from "@/components/views/comparison-swiper"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { create } from 'zustand'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion';
import { Confetti } from '@/components/ui/confetti';
import { LinkIcon } from "lucide-react"
import HyperText from "@/components/ui/hyper-text"
import RetroGrid from "@/components/ui/retro-grid"

export const useOptionsStore = create<{
  role: string
  side: string
  mode: '2D' | '3D'
  setRole: (role: string) => void
  setSide: (side: string) => void
  setMode: (mode: '2D' | '3D') => void
}>((set) => ({
  role: 'p',
  side: 'f',
  mode: '2D',
  setRole: (role: string) => set({ role }),
  setSide: (side: string) => set({ side }),
  setMode: (mode: '2D' | '3D') => set({ mode }),
}))

const parseResults = (results: { [key: string]: number | null }) => {
  let out = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const tiers = {
    'a': 1, 'b': 1, 'c': 1, 'd': 1, 'e': 1, 'f': 1,
    'g': 2, 'h': 2, 'i': 2,
    'j': 3, 'k': 3,
    'l': 4,
  }

  for (const round in results) {
    if (!(round in tiers)) {
      continue
    }

    const tier = tiers[round as keyof typeof tiers]
    const winner = results[round]
    if (winner !== null) {
      out[winner] = tier
    }
  }

  return out
}

// const resultsToString = (results: { [key: string]: number | null }) => {
//   const parsed = parseResults(results)
//   return parsed.map((value, index) => `${LETTERS[index]}: ${value}`).join(', ')
// }


export const useInstanceStore = create<{
  results: {
    [key: string]: number | null
  }
  setResults: (results: { [key: string]: number | null }) => void
  pairings: {
    label: string
    competitors: [string, string]
    round: number
  }[]
  setPairings: (pairings: { label: string, competitors: [string, string], round: number }[]) => void
}>((set) => ({
  results: {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10, '11': 11, '12': 12,
    'a': null, 'b': null, 'c': null, 'd': null, 'e': null,
    'f': null, 'g': null, 'h': null, 'i': null, 'j': null,
    'k': null, 'l': null,
  },
  setResults: (results: { [key: string]: number | null }) => set({ results }),

  pairings: [
    {
      label: 'a',
      competitors: ['0', '1'],
      round: 1,
    }, {
      label: 'b',
      competitors: ['2', '3'],
      round: 1,
    }, {
      label: 'c',
      competitors: ['4', '5'],
      round: 1,
    }, {
      label: 'd',
      competitors: ['6', '7'],
      round: 1,
    }, {
      label: 'e',
      competitors: ['8', '9'],
      round: 1,
    }, {
      label: 'f',
      competitors: ['10', '11'],
      round: 1,
    }, {
      label: 'g',
      competitors: ['12', 'a'],
      round: 2,
    }, {
      label: 'h',
      competitors: ['b', 'c'],
      round: 2,
    }, {
      label: 'i',
      competitors: ['d', 'e'],
      round: 2,
    }, {
      label: 'j',
      competitors: ['f', 'g'],
      round: 3,
    }, {
      label: 'k',
      competitors: ['h', 'i'],
      round: 3,
    }, {
      label: 'l',
      competitors: ['j', 'k'],
      round: 4,
    },
  ],
  setPairings: (pairings: { label: string, competitors: [string, string], round: number }[]) => set({ pairings }),

}))

function BottomBar() {
  const { role, setRole, side, setSide, mode, setMode } = useOptionsStore()

  return (
    <>
      {mode == '2D'
        ? <div className="w-full h-fit flex flex-col p-2 gap-2 justify-between">
          <Tabs
            value={role}
            onValueChange={(value) => setRole(value)}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger className="bg-white" value="p">Participant</TabsTrigger>
              <TabsTrigger className="bg-white" value="s">Sponsor</TabsTrigger>
              <TabsTrigger className="bg-white" value="j">Judge</TabsTrigger>
              <TabsTrigger className="bg-white" value="o">Organizer</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-row justify-between gap-2">
            <Button
              variant="outline"
              className="w-full gap-1"
              onClick={() => setSide(side === 'f' ? 'b' : 'f')}
            > Flip to the 
                <div className={`${side === 'f' ? '' : 'text-orange-600 ml-0'}`}> {side === 'f' ? 'back' : 'front'}  </div>
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setMode('3D')}
            > View in 3D </Button>
          </div>
        </div>
        :
        <div className="w-full h-fit flex flex-col p-2 gap-2 justify-between">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setMode('2D')}
          >
            Go back to 2D (You can't vote in 3D)
          </Button>
        </div>
      }
    </>
  )
}

export function ThankYouPage({ results }: { results: { [key: string]: number | null } }) {
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeSvs5wVlkdw8vweHpOPXVAvzzrBG-QpZanwyHIlByKQxfR7A/viewform?usp=pp_url' +
    `&entry.251328902=${parseResults(results)[0]}` +
    `&entry.1806517228=${parseResults(results)[1]}` +
    `&entry.1415123869=${parseResults(results)[2]}` +
    `&entry.1502442494=${parseResults(results)[3]}` +
    `&entry.950632372=${parseResults(results)[4]}` +
    `&entry.823667205=${parseResults(results)[5]}` +
    `&entry.1293051941=${parseResults(results)[6]}` +
    `&entry.1348927192=${parseResults(results)[7]}` +
    `&entry.1483199699=${parseResults(results)[8]}` +
    `&entry.1502669296=${parseResults(results)[9]}` +
    `&entry.1665242526=${parseResults(results)[10]}`;

  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Confetti />

      <HyperText
        className="text-gray-900 dark:text-gray-100 text-6xl font-bold tracking-tight mb-8 md:text-8xl"
      >
        Thank You
      </HyperText>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-md w-3/4 md:w-3/4 z-10"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 md:text-4xl">One last step...</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 md:text-lg">Help me submit a prefilled form to register your votes:</p>
        <a href={formUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-200">
            Link to Form <LinkIcon className="w-4 h-4" />
          </Button>
        </a>
      </motion.div>

      <RetroGrid
      />
    </div>
  );
}

function InstanceView() {
  const { pairings, results } = useInstanceStore()

  return (
    <>
      {pairings.length > 0
        ?
        <div className="w-screen h-dvh flex flex-col">
          <ComparisonSwiper />
          <BottomBar />
        </div>
        :
        <div className="w-screen h-dvh flex flex-col items-center justify-center">
          <ThankYouPage results={results} />
        </div>
      }

    </>
  )
}

export default InstanceView
