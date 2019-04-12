import StoneAge from './Components/StoneAge'
import SevenWonders from './Components/SevenWonders'

const routes = [
  {
    path: "/",
    exact: true,
    content: StoneAge
  },
  {
    path: "/7wonders",
    content: SevenWonders
  },

]

export default routes;