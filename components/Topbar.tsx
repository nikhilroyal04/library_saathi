'use client'


const MESSAGE = "📢 New library features launched! Try book tracking, student management & more – Book a demo today. 📚";

const Topbar = () => {
  return (
    <div className="w-full bg-accent-blue text-black overflow-hidden whitespace-nowrap relative h-8 flex items-center z-40">
      <div className="absolute inset-0 flex items-center">
        {/* Marquee animation */}
        <div
          className="animate-marquee font-medium text-sm px-2"
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            minWidth: '100%',
          }}
        >
          {MESSAGE}
          <span className="mx-8">{MESSAGE}</span>
          <span className="mx-8">{MESSAGE}</span>
        </div>
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%)
          }
          100% {
            transform: translateX(-100%)
          }
        }
      `}</style>
    </div>
  )
}

export default Topbar