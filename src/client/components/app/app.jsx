import React, { Component } from 'react';

import {
  Button, Col, Row, Grid
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Type from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
// import elbrusImg from './elbrus.png';
import { PAGES } from '../../routes/pages';
// import { bemClassNameFactory } from '../../utils/bem';
// import { sayByeAC, sayHiAC } from '../../redux/actions/app-actions';
// import { fetchUserStartAC, fetchUserSuccessAC,
// fetchUserErrorAC } from '../../redux/actions/user-actions';
// import { fetchPostsThunkAC } from '../../redux/actions/post-actions';
// import { selectSay } from '../../redux/selectors/app-selectors';
// import { selectPathname } from '../../redux/selectors/router-selectors';
// import { selectUser, selectIsUserFetching } from '../../redux/selectors/user-selectors';
// import { selectPosts, selectIsPostsFetching } from '../../redux/selectors/post-selectors';
import './app.css';

import {
  postLoginSuccessAC
} from '../../redux/actions/login-actions';

// const cn = bemClassNameFactory('app');
//
// const mapStateToProps = state => ({
//   say: selectSay(state),
//   pathname: selectPathname(state),
//   userInfo: selectUser(state),
//   isUserFetching: selectIsUserFetching(state),
//   posts: selectPosts(state),
//   isPostsFetching: selectIsPostsFetching(state)

import { selectLoginUser } from '../../redux/selectors/login-selectors';


const mapStateToProps = state => ({
  login: selectLoginUser(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  doRoute: push,
  postLoginSuccess: postLoginSuccessAC
}, dispatch);


class App extends Component {
  static propTypes = {
    doRoute: Type.func.isRequired,
    postLoginSuccess: Type.func.isRequired
  };

  // static defaultProps = {
  //   name: 'Default Name',
  // };

  state = {
    show: false
  };

  handleOpenPage = path => () => {
    const { doRoute } = this.props;
    doRoute(path);
  };

  componentDidMount() {
    let fetching = async () => {
      const user = await fetch('/api/isauth')
      const userJson = await user.json();
      this.props.postLoginSuccess(userJson);
    }
    fetching()
  }

  giveMeButtons = () => {
    if(!this.props.login) {
      console.log(this.props)
      return (
        <div className='button-toolbar enter-buttons'>
          <Link to={PAGES.signup.path}>
            <Button className='form-buttons' bsStyle='default'>Зарегистрироваться</Button>
          </Link>
          <Link to={PAGES.login.path}>
            <Button className='form-buttons' bsStyle='default'>Войти</Button>
          </Link>
          <Link to={PAGES.chat.path}>
          <Button>ok</Button></Link>
        </div>
      )
    }
    else {
      console.log('dfdf')
      return (
        <div className='button-toolbar enter-buttons'>
          <Link to={PAGES.profile.path}>
            <Button className='form-buttons' bsStyle='default'>Профиль</Button>
          </Link>
          <Link to={PAGES.chat.path}>
            <Button className='form-buttons' bsStyle='default'>Сообщения</Button>
          </Link>
        </div>
      )
    }
  }

  render() {
    const {
      children
    } = this.props;
    // console.log(this.props);
    return (

        <div className='container-fluid'>
          <header >
          <Grid>
            <Row>
              <Col xs={4} lg={12} md={8} className='main-menu'>
                <div className='button-toolbar toolbar-links'>
                  <Link to={PAGES.home.path}>
                    <div className='menu-text'>
                      На главную
                    </div>
                  </Link>
                  <Link to={PAGES.users.teachers.path}>
                    <div className='menu-text'>
                      Наши преподаватели
                    </div>
                  </Link>
                  <Link to={PAGES.users.students.path}>
                    <div className='menu-text'>
                      Наши студенты
                    </div>
                  </Link>
                  <Link to={PAGES.about.path}>
                    <div className='menu-text'>
                      О нас
                    </div>
                  </Link>
                  <Link to={PAGES.feedback.path}>
                    <div className='menu-text'>
                      Задать вопрос
                    </div>
                  </Link>
                </div>
                { this.giveMeButtons() }
              </Col>
            </Row>
          </Grid>

          </header>
              <Grid>
                <Row>
                  <Col>
            {children}
                  </Col>
                </Row>
          </Grid>
        </div>
    );
  }
}

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default VisibleApp;
