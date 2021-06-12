import {Link} from 'react-router-dom'
import {useLocation} from "react-router-dom"


const Fotter = ()=>{
const location = useLocation()
{console.log(location)}
return(<footer>
<p>Copyright&copy; 2021</p>
{location.pathname != '/about' && <Link to='/about'>About</Link>}
</footer>)
}

export default Fotter