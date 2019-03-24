//React
import React, { Component } from 'react'; //React
//Grid 
import {Responsive as ResponsiveGridLayout} from 'react-grid-layout';
//CSS
import '../node_modules/react-grid-layout/css/styles.css'; //Grids
import '../node_modules/react-resizable/css/styles.css'; //Grids
import './App.css'; //"Main" CSS


var data = require('./contentDatabase.json');
let contentObject = [];
var xGridElements = 3; //How many elements are there in a row.


class App extends Component {
	constructor(props) {
		super(props);

		this.state = { width: 0, height: 0 };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.testJSON = this.testJSON.bind(this);
	}

	testJSON() {
		contentObject = []; // Empty it just to be sure.

		var xOR = 0; //Element X pos
		var yOR = 0; //Element Y pos

		for (var i = 0; i < data.content.contents.length; i++) {
			//Positioning for grids
			if (xOR === xGridElements) {
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
				projectLanguage: data.content.contents[i].projectLanguage,
				projectFramework: data.content.contents[i].projectFramework,
				posX: xOR,
				posY: yOR
			}
			xOR++;
		}
	}

	openLink(path) {
		if (path) {
			window.open(path, "_blank");
		}
	}

	createDivs() {
		return contentObject.map(item => {	
			var ID = item.contentId;

			return (
				<div className="gridElement" id={"girdElement" + ID} key={ID} data-grid={{x: item.posX, y: item.posY, w: 1, h: 1, static: true}}>
					<button className="gridElementButton" id={"gridElementButton" + ID} href={item.contentUrl} onClick={() => this.openLink(item.contentUrl)}>
						<div className="girdTop" id={"gridTop" + ID}>
							<img className="gridElementImage" id={"gridElementImage" + ID} alt="Project Banner" src={require(`${item.contentImage}`)}/>
						</div>
						<div className="gridMiddle" id={"gridMiddle" + ID}>
							<h4 className="gridElementTitle" id={"gridElementTitle" + ID}>{item.contentTitle}</h4>
							<p className="gridElementDate" id={"gridElementDate" + ID}>{item.createDate}</p>
							<p className="gridElementContent" id={"gridElementContent" + ID}>{item.contentCont}</p>
							<p className="gridElementLanguage" id={"gridElementLanguage" + ID}>{item.projectLanguage}</p>
							<p className="gridElementFramework" id={"gridElementFramework" + ID}>{item.projectFramework}</p>
						</div>
						<div className="gridBottom" id={"gridBottom" + ID}>
							<img className="gridElementImageBottom" id={"gridElementImageBottom" + ID} src={require(`${item.contentImageBottom}`)}/>
						</div>
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
					<h1 id="HeaderNameTitle">Tønnes Tobias Pedersen Røren</h1>
					<div className="HeaderContents" id="HeaderContent">
						<p className="HeaderContents" id="HeaderContentLine0"> | </p>
						<a className="HeaderContents" href="tel:97696877">97696877</a>		
						<p className="HeaderContents" id="HeaderContentLine1"> | </p> 
						<a className="HeaderContents" href="mailto:tonnes.roren@gmail.com">tonnes.roren@gmail.com</a>
						<p className="HeaderContents" id="HeaderContentLine2"> | </p> 
						<a className="HeaderContents" href="https://www.linkedin.com/in/tønnes-tobias-p-648439a4/">LinkedIn</a>
						<p className="HeaderContents" id="HeaderContentLine3"> | </p>
						<a className="HeaderContents" href="https://github.com/tonnesr">GitHub</a>
						<p className="HeaderContents" id="HeaderContentLine4"> | </p>
						<a className="HeaderContents" href="https://bitbucket.org/tonnesr/">BitBucket</a>
						<p className="HeaderContents" id="HeaderContentLine5"> | </p>
					</div>
				</header>
				<div>
					<ResponsiveGridLayout 
						className="layout" 
						rowHeight={25} 
						width={this.state.width} 
						verticalCompact={false} 
						rowHeight={420}
						breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}} 
						cols={{lg: xGridElements, md: xGridElements, sm: xGridElements - 1, xs: xGridElements - 2, xxs: xGridElements - 2}}
					>
						{this.createDivs()}
					</ResponsiveGridLayout>
				</div>
      		</div>
    	);
  	}
}

export default App;
