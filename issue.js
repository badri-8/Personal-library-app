class Issue {
  static issues = []; // in-memory store
  static idCounter = 1;

  constructor({ project, issue_title, issue_text, created_by, assigned_to, status_text }) {
    this._id = (Issue.idCounter++).toString();
    this.project = project;
    this.issue_title = issue_title;
    this.issue_text = issue_text;
    this.created_by = created_by;
    this.assigned_to = assigned_to || "";
    this.status_text = status_text || "";
    this.created_on = new Date();
    this.updated_on = new Date();
    this.open = true;
  }

  save() {
    Issue.issues.push(this);
    return Promise.resolve(this);
  }

  static find(filter) {
    let result = Issue.issues.filter(i => i.project === filter.project);
    Object.keys(filter).forEach(key => {
      if (key !== "project") result = result.filter(i => i[key] == filter[key]);
    });
    return Promise.resolve(result);
  }

  static findOneAndUpdate(filter, updateData) {
    const issue = Issue.issues.find(i => i._id === filter._id && i.project === filter.project);
    if (!issue) return Promise.resolve(null);
    Object.keys(updateData).forEach(k => {
      if (k !== "_id") issue[k] = updateData[k];
    });
    issue.updated_on = new Date();
    return Promise.resolve(issue);
  }

  static findOneAndDelete(filter) {
    const index = Issue.issues.findIndex(i => i._id === filter._id && i.project === filter.project);
    if (index === -1) return Promise.resolve(null);
    const deleted = Issue.issues.splice(index, 1)[0];
    return Promise.resolve(deleted);
  }
}

module.exports = Issue;
