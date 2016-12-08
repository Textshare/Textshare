import React from "react"
import { Component } from "react"
import "./RevisionList.scss"
import RevisionBlock from "components/RevisionBlock"
import DiffMatchPatch from "diff-match-patch"

class RevisionList extends Component {
  componentWillMount() {
    this.diff = new DiffMatchPatch()
  }

  computeDiffs = (revisions) => {
    let diffs = revisions.reduce((acc, revision, index) => {
      return acc.concat([[revision, revisions[index + 1]]])
    }, []).map((pair) => {
      if (pair[1]) {
        return this.diff.diff_main(pair[1].content, pair[0].content)
      } else {
        return this.diff.diff_main(pair[0].content, pair[0].content)
      }
    })

    return revisions.map((revision, index) => {
      return Object.assign(revision, { contentDiff: diffs[index] })
    })
  }

  render() {
    return (
      <div>
        {
          this.computeDiffs(this.props.revisions).map((revisionDiff, index) => {
            return <RevisionBlock
                      revisionDiff={revisionDiff}
                      key={revisionDiff.id}
                      first={index == 0}>
                    </RevisionBlock>
          })
        }
      </div>
    )
  }
}

export default RevisionList
