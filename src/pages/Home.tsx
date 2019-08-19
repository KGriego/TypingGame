/* Library Imports */
import * as React from "react";
import * as _ from "lodash";
import { Progress, Grid } from "semantic-ui-react";
import wordsToNumbers from "words-to-numbers";

/* Redux Imports */
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";

/* Component Imports */

/* Style Imports */

/* Type Imports */
interface Props {
  lesson: any;
  actions: any;
}

class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.div = React.createRef();
  }
  componentDidMount() {
    this.div && this.div.focus();
  }
  captureInputRedux = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const {
      lesson,
      lesson: { currentLesson },
      actions: { sendKey }
    } = this.props;

    const currentPage = lesson[currentLesson].currentPage;

    const currentKey =
      lesson[currentLesson][currentPage] &&
      lesson[currentLesson][currentPage].currentKey;

    if (
      lesson[currentLesson][currentPage] &&
      lesson[currentLesson][currentPage].keys[currentKey] &&
      e.key === lesson[currentLesson][currentPage].keys[currentKey].letter
    ) {
      sendKey({ key: e.key, currentKey, currentPage, currentLesson });
    }
  };
  render() {
    const {
      lesson,
      lesson: { currentLesson }
    } = this.props;

    const currentPage = lesson[currentLesson].currentPage;

    const currentPageInt = wordsToNumbers(lesson[currentLesson].currentPage);
    const amountOfPages = Object.keys(lesson[currentLesson]);

    const percent = 100 * (currentPageInt / (amountOfPages.length - 1));
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column computer={"14"}>
            <div
              onKeyDown={this.captureInputRedux}
              ref={ref => (this.div = ref)}
              tabIndex={0}
            >
              {lesson[currentLesson][currentPage] &&
                lesson[currentLesson][currentPage].keys.map((letter: any) => {
                  return (
                    <span
                      style={{ color: `${letter.passed ? "green" : "red"}` }}
                    >
                      {!letter.passed ? (
                        <ins>{letter.letter}</ins>
                      ) : (
                        <del>{letter.letter}</del>
                      )}
                    </span>
                  );
                })}
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={"14"}>
            <Progress percent={percent} indicating />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state: any) => {
  const currentLesson = state.currentLesson;
  return { lesson: { [currentLesson]: state[currentLesson], currentLesson } };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
