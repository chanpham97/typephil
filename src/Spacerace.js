
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header'
import ShowSpinner from './components/spinner';
//import styled from 'styled-components';
import Arcade from './fonts/Spacerace/title.TTF'; 
import Avenir from './fonts/Spacerace/arcade.TTF'; 
import './style/spacerace.css';
import SpaceracePlay from './SpaceracePlay';

import { 
  fetchAllChapterNames, 
  fetchAllPairs, 
  fetchCompletedLessons,
  fetchLessonById
} from './actions/learn'

import { getCurrentLessonForUser } from './actions/homepage';

class Spacerace extends Component {
  constructor(props) {
    super(props);
    this.state ={
			headerLinks: ["Games", "Learn", "Home"],
			isPlay: false,
			difficulty: "easy"
		}	
	}
	
	play = () => {
		this.setState({isPlay:true})
	}

  render() {
    const { 
      isLoading, 
    } = this.props;

    if(isLoading) {
      return <ShowSpinner />
    } 

    const { 
      headerLinks, 
		} = this.state;
		
		return (
			<div>
				<Header 
					links={headerLinks} 
					isLoggedIn={this.props.isLoggedIn} 
					username={this.props.currentUser.username}>
				</Header>	
				{this.state.isPlay === true ? (
					<SpaceracePlay
						difficulty={this.state.difficulty}
						>
					</SpaceracePlay>
				) : (
					<SpaceraceDescription
						play={this.play}>
					</SpaceraceDescription>
				)}
			</div>
		)
	}
}

const SpaceraceDescription = ({ play }) => {

	return (
		<div className="MetaWrapper">

			<div className = "GameTitleContainer">
				
				<div className="GameTitle">
					<p>Space Race</p>
				 </div>

			</div>

			<div className = "TextBoxContainer">

				<div className="TextBox">

					<p>Type the words on the asteroids as they appear to eliminate them 
							before they make impact on Earth. Each time an asteroid makes it through, 
							you will lose a life. You start with three lives. You can gain a life each time 
							you make it to the next level. As the levels increase, the number of asteroids also 
							increase in number.
					</p>

				</div>

			</div>

			<div className = "PlayButton">

				<button onClick = {play}> Play </button>
	     
			 </div>

		 </div>					
	)
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ 
		fetchAllChapterNames, 
		fetchAllPairs, 
		fetchCompletedLessons,
		fetchLessonById,
		getCurrentLessonForUser
	}, dispatch);
}

const mapStateToProps = ({ app, auth }) => {
	return {
		allChapters: app.allChapters,
		isLoading: app.isLoading,
		chapterLessonPairs: app.chapterLessonPairs,
		completedLessons: app.completedLessons,
		currentUser: auth.currentUser,
		isLoggedIn: auth.isLoggedIn,
		currentLessonName: app.currentLesson.lessonName
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Spacerace); 