import {
    Block,
    Change,
    Data,
    Document,
    History,
    Inline,
    Leaf,
    Mark,
    Node,
    Range,
    Schema,
    Stack,
    Value,
    Text
} from "@zykj/slate";

/**
 * Create a prop type checker for Slate objects with `name` and `validate`.
 *
 * @param {String} name
 * @param {Function} validate
 * @return {Function}
 */

function create(name, validate) {
    function check(
        isRequired,
        props: any = {},
        propName = "",
        componentName = "",
        location: any = ""
    ) {
        const value = props[propName];
        if (value == null && !isRequired) return null;
        if (value == null && isRequired)
            return new Error(
                `The ${location} \`${propName}\` is marked as required in \`${componentName}\`, but it was not supplied.`
            );
        if (validate(value)) return null;
        return new Error(
            `Invalid ${location} \`${propName}\` supplied to \`${componentName}\`, expected a Slate \`${name}\` but received: ${value}`
        );
    }
    let propType = Object.assign(
        function propType(...args) {
            return check(false, ...args);
        },
        {
            isRequired: function(...args) {
                return check(true, ...args);
            }
        }
    );

    return propType;
}

/**
 * Prop type checkers.
 *
 * @type {Object}
 */

const Types = {
    block: create("Block", v => Block.isBlock(v)),
    blocks: create("List<Block>", v => Block.isBlockList(v)),
    change: create("Change", v => Change.isChange(v)),
    data: create("Data", v => Data.isData(v)),
    document: create("Document", v => Document.isDocument(v)),
    history: create("History", v => History.isHistory(v)),
    inline: create("Inline", v => Inline.isInline(v)),
    inlines: create("Inline", v => Inline.isInlineList(v)),
    leaf: create("Leaf", v => Leaf.isLeaf(v)),
    leaves: create("List<Leaf>", v => Leaf.isLeafList(v)),
    mark: create("Mark", v => Mark.isMark(v)),
    marks: create("Set<Mark>", v => Mark.isMarkSet(v)),
    node: create("Node", v => Node.isNode(v)),
    nodes: create("List<Node>", v => Node.isNodeList(v)),
    range: create("Range", v => Range.isRange(v)),
    ranges: create("List<Range>", v => Range.isRangeList(v)),
    schema: create("Schema", v => Schema.isSchema(v)),
    stack: create("Stack", v => Stack.isStack(v)),
    value: create("Value", v => Value.isValue(v)),
    text: create("Text", v => Text.isText(v)),
    texts: create("List<Text>", v => Text.isTextList(v))
};

export default Types;