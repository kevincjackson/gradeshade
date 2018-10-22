# Gradeshade

## Description

**A grade visualization tool.**

Students can track and visualize their grades.
Students can see what grade they need to improve.
Teachers can demonstrate averages and weighting.

## Quick Examples

(Screenshot)

```
--------------------
GS              User
--------------------
     Gradeshade
--------------------
Menu
--------------------
  Klass      Grade
    +-ie
  +--------------+
  |              |
  |              |
  |              |
  |    Graph     |
  |              |
  |              |
  |  Cat / Item  |
  +--------------+  Cat / Item Workspace
                f   Possible Range
--------------------
       Legal
```

## Quick start

<http://www.gradeshade.com>

## Documentation

### Sitemap

```
  User
    signin
      signout
    signup
  Menu
    Quickstart
    Docs
    Understanding Weights
    Examples
  Graph
    Klass
      Category
        Item
  Legal
  Sitemap
```

### Data Definition

```
User
  id: int
  email: String
  hash: String
  klasses: [Klass]

Klass: Enumeration
  Klass With Weighted Categories
  Klass With Unweighted Categories

Klass With Weighted Categories
  name: String
  categories: [Weighted Category]
  ---
  points() -> Number
  max() -> Number

Klass With Unweighted Categories
  name: String
  categories: [Unweighted Category]
  ---
  points() -> Number
  max() -> Number

Weighted Category
  name: String
  weight: Number (0 - 100)
  items: [Item]
  ---
  points() -> Number
  max() -> Number

Unweighted Category
  name: String
  effective_weight: Number(0 - 100)
  items: [Item]
  ---
  points() -> Number
  max() -> Number

Item
  name: String
  points: Number
  max: Number
  date: Date || NULL

Grade
  constructor(points, max, gradeFunction) -> Grade
  percentage: Number
  letter: String
  grade: String

Helpers
  percentageToGrade(percentage) -> String
  percentageToString(percentage) -> String
```

Will live at <http://gradeshade.com/docs>

## Project organization

### Feature Requests

- Grade changes animate
- Autocomplete for categories:
  current words + essays, paper, report
- Answer what grade do I need?
- Save info

### Contributing

Email me below.

### Bug Report

Email me below.

### Author

[Kevin Jackson](mailto:kj31428@gmail.com)

## Legal Notes

License: MIT
Copyright: 2017 - Present
