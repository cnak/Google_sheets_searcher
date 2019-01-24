import React from 'react';
import PropTypes from 'prop-types';

const ResultList = props => {
  const { projects } = props;

  return projects.map(value => (
    <table key={value.projectId}>
      <tbody>
        <tr>
          <th>Project Name</th>
          <th>Project Description</th>
          <th>Job Number</th>
          <th>Project Type</th>
          <th>Language</th>
        </tr>
        <tr>
          <td>{value.name}</td>
          <td>{value.description}</td>
          <td>{value.jobNumber}</td>
          <td>{value.type}</td>
          <td>{value.language}</td>
        </tr>
      </tbody>
    </table>
  ));
};

ResultList.defaultProps = {
  projects: [],
};

ResultList.propTypes = {
  projects: PropTypes.instanceOf(Array),
};

export default ResultList;
