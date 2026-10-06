import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-limestone pb-20 pt-32">
      <div className="container-x flex flex-col items-center text-center">
        <span className="arch grid h-40 w-32 place-items-end justify-center bg-white pb-6 font-display text-[3rem] text-accent shadow-card">
          404
        </span>
        <h1 className="mt-8 font-display text-[2.4rem] leading-tight sm:text-[3rem]">This door doesn’t lead anywhere</h1>
        <p className="mt-3 max-w-md text-[1rem] text-muted">
          The page or property you’re looking for may have been sold, let, or moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/properties">Browse properties</Button>
          <Button to="/" variant="outline">Back to home</Button>
        </div>
      </div>
    </section>
  )
}
