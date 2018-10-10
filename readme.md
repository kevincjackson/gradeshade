## Structure

```
User
  id: int
  email: String
  hash: String
  klasses: [Klass]

Klass
  name: String
  categories_use_weights: True || False
  categories: [Category]
  ---
  points()
  max()

Category
  name: String
  weight: Number || NULL
  items: [Item]
  ---
  points()
  max()

Item
  name: String
  points: Number
  max: Number

Grade
  percentage(points, max)
  grade(percentage)
  to_s()
```

## Research

### Grade Portals

- Aeries
- Illuminate
- PowerSchool
- Schoology

## TODO

- Add testing.
- Refactor: delete unused code.
- Refactor: missing actual Model layer.

## Feature Requests

- Animate Grade change.
- Autofill for assignments using current words + essays, paper, report
- Add feature to add category: pinned weight with sub-assignments.
  - Example
  - Quiz, Weight 20, always adds to 20 regardless of subquizes
    - Quiz 1
    - Quiz 2
    - Quiz 3
- Add feature to answer question: what grade do I need?
- Add ability to save work.
