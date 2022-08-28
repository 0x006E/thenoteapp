const subjectConverter = {
  toFirestore: function (subject) {
    return {
      name: subject.name,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      topics: [],
    };
  },
};

const topicConverter = {
  toFirestore: function (topic) {
    return {
      name: topic.name,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      notes: [],
    };
  },
};

const noteConverter = {
  toFirestore: function (note) {
    return {
      content: note.content,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      content: data.content,
    };
  },
};

export { subjectConverter, topicConverter, noteConverter };
