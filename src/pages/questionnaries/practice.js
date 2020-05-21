import React from 'react';
import Questionnaries from '../questionnaries/questionnaries';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import _map from "lodash/map";

const POST_QUERY = gql`
query QUESTIONNAIRE_FIND($id: String!) {
  questionnaireFind(id: $id) {
      id
      name
      description
      status
      level
      category {
          name
          id
      }
      questions {
          id
          title
          explainAnswer
          questionType
          answers {
              id
              title
              score
              isCorrect
              answerType
          }
      }
      createdBy {
          id
          email
          firstName
      }
      createdAt
      updatedAt
  }
}
`;

class Pracpopup extends React.Component {    
  getListedData = data => {
    return data;
  };

  render() {  
    const { data } = this.props;
    const preQuestion = this.getListedData(data.questionnaireFind || {});  
    console.log("data",preQuestion);
    return (  
      <div>  
        <div style={{backgroundColor:"rgba(0,0,0,0.05)", margin: 20, borderRadius: 20, padding: 20}}>
          <h1 style={{textAlign: "center", margin: "0 0 -20px", fontSize: 25 }}>{preQuestion.name}</h1>
          <h1 style={{textAlign: "left", margin: "20px 20px 0", fontWeight: "unset" }}>{preQuestion.description}</h1>    
        </div>
        <Questionnaries close={this.props.closePopup} id={preQuestion.id} />
      </div>  
    );  
  }  
}  

export default graphql(POST_QUERY, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id
    }
  })
})(Pracpopup);