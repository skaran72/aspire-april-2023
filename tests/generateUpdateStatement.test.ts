import generateUpdateStatement from "../../src/service/generateUpdateStatement";

describe("generateUpdateStatement", () => {
  it("returns an empty object when given an empty document and mutation", () => {
    const document = {};
    const mutation = {};
    const result = generateUpdateStatement(document, mutation);
    expect(result).toEqual({});
  });

  it("applies mutations to the document and returns a statement object", () => {
    const document = { name: "Alice", age: 30, posts: [{_id: 2, value: "one"}] };
    const mutation = { posts: [{_id: 2, value: "too"}] }
    const result = generateUpdateStatement(document, mutation);
    expect(result).toEqual({ "$update": {"posts.0.value": "too"} });
  });

  it("applies mutations to the document with sub document array and returns a statement object", () => {
    const document = { name: "Alice", age: 30, posts: [{_id: 2, value: "one", mentions: []}] };
    const mutation = { posts: [{_id: 2, mentions: [{text: "blue"}]}] }
    const result = generateUpdateStatement(document, mutation);
    expect(result).toEqual({"$add":{"posts.0.mentions":[{"text":"blue"}]}});
  });


  it("applies delete mutations to the document with sub document array and returns a statement object", () => {
    const document = { name: "Alice", age: 30, posts: [{_id: 2, value: "one", mentions: []}, {_id: 4, value: "four"}] };
    const mutation = { posts: [{_id: 4, _delete: true}] }
    const result = generateUpdateStatement(document, mutation);
    expect(result).toEqual({"$remove":{"posts.1":true}});
  });


  it("applies different types of mutations to the document with sub document array and returns a combined statement object", () => {
    const document = { name: "Alice", age: 30, posts: [{_id: 2, value: "one", mentions: []}, {_id: 4, value: "four"}, {_id: 64, value: "sixty-four", mentions: [{_id: 34, text: 'aspire'}]}] };
    const mutation = { posts: [{_id: 4, _delete: true},  {_id: 2, mentions: [{text: "apples"}]}, {_id: 64, value: 'sixty-four-updated'}] }
    const result = generateUpdateStatement(document, mutation);
    expect(result).toEqual({"$remove":{"posts.1":true},"$add":{"posts.0.mentions":[{"text":"apples"}]},"$update":{"posts.2.value":"sixty-four-updated"}});
  });

  it("applies different types of mutations a document with different structure than the one mentioned in example", () => {
    const document = { employees: [{_id: 2, name: "John", reportees: [{ _id: 2, name: 'Alex'}]}, {_id: 4, name: "Eric"}, {_id: 64, name: "Alexa", reportees: [{_id: 34, name: 'Best employee'}]}] };
    const mutation = { employees: [{_id: 4, _delete: true},  {name: "Best manager"}, {_id: 64, reportees: [{_id: 34, name: "Not great anymore employee"}]}] }
    const result = generateUpdateStatement(document, mutation);
    expect(result).toEqual({"$remove":{"employees.1":true},"$add":{"employees":[{"name":"Best manager"}]},"$update":{"employees.2.reportees.0.name":"Not great anymore employee"}});
  });


});
