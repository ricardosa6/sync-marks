export function countBookmarks(tree: chrome.bookmarks.BookmarkTreeNode[]) {
  let count = 0;
  const stack = [...tree]; // Creamos una copia del árbol

  while (stack.length > 0) {
    const node = stack.pop()!; // Sacamos el último nodo de la pila

    if (!node.children || node.children.length === 0) {
      // El nodo no tiene hijos, es una hoja
      count++;
    } else {
      // El nodo tiene hijos, los agregamos a la pila para procesarlos posteriormente
      stack.push(...node.children);
    }
  }

  return count;
}
