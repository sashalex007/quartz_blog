import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  return (
    <article class="popover-hint">
      <h1>Coming soon</h1>
      <p>I'm working on it!</p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
