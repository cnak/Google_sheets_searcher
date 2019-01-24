const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const credentials = require('./service-account.json');

const SPREADSHEET_ID = `1DdYD5bD53K8dpTvvxh9cNwMiv4ZlwygCSlJHjwjFwvg`;

async function getProjects(query) {
  if (query.length === 0) {
    return [] 
  }

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await promisify(doc.useServiceAccountAuth)(credentials);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[1];

  const rows = await promisify(sheet.getRows)({
    offset: 0,
    limit: 50,
    orderby: 'col2',
  });

  const projects = rows.map(project => ({
    projectId: project.projectid,
    name: project.projectname,
    jobNumber: project.jobnumber,
    description: project.projectdescription,
    language: project.language,
    type: project.projecttype,
  }));

  const filterProjects = projects.reduce((filtered, option) => {
    const { name, projectId, jobNumber, description, language, type } = option;
    if (name.toLowerCase().includes(query.toLowerCase())) {
      const project = {
        projectId,
        name,
        jobNumber,
        description,
        language,
        type,
      };
      filtered.push(project);
    }
    return filtered;
  }, []);

  return filterProjects;
}

module.exports = { getProjects };
