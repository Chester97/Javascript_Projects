import {ast} from './ast.json'

const stringToHTML = function (str) {
  const dom = document.createElement("div");
  dom.innerHTML = str;
  return dom.firstChild;
};

function convertChildrenToDomElements(children, appendCallback) {
  if(!children.length) {
    return;
  }
  return children.forEach((element) => {
    if(element) {
      const el = parentElementConfig(element);
      return appendCallback(el);
    }
  })
}

function generateDomTree(obj) {
  const rootElement = parentElementConfig(obj);
  console.log(rootElement)
  return rootElement;
}

function parentElementConfig(obj) {
  let element = createProperElement(obj)
  if(obj.children?.length) {
    convertChildrenToDomElements(obj.children, (a) => element.appendChild(a));
  }
  return element;
}

function createProperElement(node) {
  let createdNode;
  if(node.nodeType === 'text') {
    createdNode = document.createTextNode(node.value)
  } else {
    createdNode = document.createElement(node.tagName);
    if(node.attributes?.length) {
      node.attributes.forEach(({name, value}) => createdNode.setAttribute(name, value));
    }
  }

  return createdNode;
}
generateDomTree(ast);

function convertAstToHtmlString2(astObject) {
  const { tagName, attributes, children } = astObject;
  let result = document.createElement(tagName);
  if (attributes.length) {
    const attr = attributes[0];
    result.setAttribute(attr?.name, attr?.value);
  }

  if (children?.length) {
    const chldr = children[0];
    if (chldr?.nodeType !== "element") {
      result.append(chldr.value);
    } else {
      const res = stringToHTML(convertAstToHtmlString(chldr));

      result.appendChild(res);
    }
  }

  return result.outerHTML;
}
