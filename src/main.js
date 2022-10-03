let localUser = null;

function uuidv4() {
  // got this from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function initUser() {
  localUser = localStorage.getItem('userId');
  if (localUser === null) {
    let userid = uuidv4();
    localStorage.setItem('userId', userid);
    localUser = userid;
  }
  console.log(`localUser : ${localUser}`);
}

export class Project {
  constructor(name) {
    this.id = uuidv4();
    this.ownerId = localUser;
    this.name = name || '';
    this.created = new Date();
  }
}

export class Story {
  constructor(projId, title, description) {
    this.projectId = projId;
    this.title = title;
    this.description = description;
    this.role = role;
    this.action = action;
    this.reason = reason;
    this.created = new Date();
  }
}
