//React
import React, { Component } from 'react'; //React
//CSS
import '../node_modules/react-grid-layout/css/styles.css'; //Grids
import '../node_modules/react-resizable/css/styles.css'; //Grids
import './App.css'; //"Main" CSS
//Grid 
import {Responsive as ResponsiveGridLayout} from 'react-grid-layout';

var test1 = require(`./resources/frogBanner1Bottom.png`);
var data = require('./contentDatabase.json');
let contentObject = [];


class App extends Component {
	constructor(props) {
		super(props);

		this.state = { width: 0, height: 0, name: "Tønnes" };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.testJSON = this.testJSON.bind(this);
	}

	testJSON() {
		contentObject = []; // Empty it just to be sure.

		var xOR = 0;
		var yOR = 0;

		for (var i = 0; i < data.content.contents.length; i++) {
			//Positioning for grids
			if (xOR === 3) {
				xOR = 0;
				yOR++;
			}

			contentObject[i] = {
				contentId: data.content.contents[i].contentID,
				contentUrl: data.content.contents[i].contentURL,
				createDate: data.content.contents[i].createDate,
				contentImage: data.content.contents[i].contImage,
				contentImageBottom: data.content.contents[i].contImageBottom,
				contentTitle: data.content.contents[i].contTitle,
				contentCont: data.content.contents[i].contCont,
				posX: xOR,
				posY: yOR
			}
			xOR++;
		}
	}

	createDivs() {
		return contentObject.map(item => {	
			console.log(item.createDate);
			return (
				<div className="gridElement" id={"girdElement" + item.contentId} key={item.contentId} data-grid={{x: item.posX, y: item.posY, w: 1, h: 1, static: true}}>
					<button className="gridElementButton" id={"gridElementButton" + item.contnentId} onClick={console.log("Click")}>
					<img className="gridElementImage" id={"gridElementImage" + item.contentId} alt="Project Banner" src={require(`${item.contentImage}`)}/>
					<h4 className="gridElementTitle" id={"gridElementTitle" + item.contentId}>{item.contentTitle}</h4>
					<p className="gridElementDate" id={"gridElementDate" + item.contnentId}>{item.createDate}</p>
					<p className="gridElementContent" id={"gridElementContent" + item.contentId}>{item.contentCont}</p>
					<img className="gridElementImageBottom" id={"gridElementImageBottom" + item.contentId} src={require(`${item.contentImageBottom}`)}/>
					</button>
				</div>
			);
		});
	}

	/**
	 * Screen Size
	 */
	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}	
	updateWindowDimensions() {
		this.setState({ width: window.innerWidth - 17 }); //17 = size of most scrollbars
	}

  	render() {
		return (
      		<div className="App">
				
			  	{this.testJSON()}
        		<header className="App-header">
					<p>Hello, my name is {this.state.name}</p>
        		</header>
				<div>
					<ResponsiveGridLayout 
						className="layout" 
						rowHeight={25} 
						width={this.state.width} 
						verticalCompact={false} 
						rowHeight={420}
						breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}} 
						cols={{lg: 3, md: 10, sm: 6, xs: 4, xxs: 2}}
					>
						{this.createDivs()}
					</ResponsiveGridLayout>
				</div>
				
				<div id="notSupported">
					<p id="notSupportedText">I'm sorry, but this screen size is currently not supported. I'm sorry for the inconvenience.</p>
				</div>
      		</div>
    	);
  	}
}

export default App;
