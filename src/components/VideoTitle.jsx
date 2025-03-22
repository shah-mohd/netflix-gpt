
const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="py-5 w-1/4">{overview}</p>
        <div>
            <button className="bg-white px-10 py-2 rounded-lg text-black text-xl hover:opacity-80">▶️Play</button>
            <button className="mx-2 bg-gray-500/50 px-10 py-2 rounded-lg text-white text-xl hover:opacity-80">ℹ️More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle