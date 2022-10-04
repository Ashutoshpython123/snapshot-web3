import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { memo } from "react";

import Snapshot from "./Snapshot";
import NFTSnapshot from "./NFTSnapshot"




function App() {
	
	return (
			<Router>

				<div className="App">

					<Switch>					

						<Route path="/" exact component={NFTSnapshot} />
						
						<Route path="/snap" exact component={Snapshot} />
					
					</Switch>
				</div>
			</Router>

	);
}

export default memo(App);
