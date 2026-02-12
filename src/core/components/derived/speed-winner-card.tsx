import ContentLayout from '../layout/content-layout'
import person from '@public/assets/images/person.png'

function SpeedWinnerCard({ winner }: { winner: string }) {
  return (
    <div className='flex-1 flex-col w-full h-full'>
      <img src='/assets/images/speed-question/header.webp' className='w-full' />
      <div className="relative w-full">
        <img src='/assets/images/speed-question/body.webp' className='object-contain w-full' />

        <div className='absolute inset-0 flex flex-col justify-center items-center'>
          <div className='flex flex-col items-center justify-center text-center px-6 animate-in fade-in zoom-in duration-500'>
            <h2 className='text-3xl font-black text-amber-500 uppercase tracking-[0.2em] mb-6 drop-shadow-xl'>
              SPEED WINNER
            </h2>
            <p className='text-7xl font-black text-white uppercase tracking-wider mb-6'>
              {winner}
            </p>
            <p className='text-white/90 text-base font-normal tracking-wide max-w-md leading-relaxed'>
              You will always be the first to start.
            </p>

            <div className='mt-8 w-24 h-1 bg-linear-to-r from-transparent via-amber-500/50 to-transparent rounded-full' />
          </div>
        </div>
      </div>
      <img src='/assets/images/speed-question/footer.webp' className='object-contain w-full' />
    </div>
  )
}

export default SpeedWinnerCard