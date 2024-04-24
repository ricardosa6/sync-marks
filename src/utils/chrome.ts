export function countBookmarks(tree: chrome.bookmarks.BookmarkTreeNode[]) {
  let count = 0;
  const stack = [...tree]; // Creamos una copia del árbol

  while (stack.length > 0) {
    const node = stack.pop()!; // Sacamos el último nodo de la pila

    if (!node.children) {
      // El nodo no tiene hijos, es una hoja
      count++;
    } else {
      // El nodo tiene hijos, los agregamos a la pila para procesarlos posteriormente
      stack.push(...node.children);
    }
  }

  return count;
}

export async function addAllBookmarks(
  bookmarks: chrome.bookmarks.BookmarkTreeNode[],
): Promise<void> {
  if (!bookmarks) {
    Promise.reject(new Error("Failed to get bookmarks tree"));
    return;
  }

  const childrenSortedByIndexAsc = bookmarks[0].children?.sort(
    (a, b) => b.index! - a.index!,
  );

  const stack = [...childrenSortedByIndexAsc!]; // Creamos una copia del árbol

  while (stack.length > 0) {
    const node = stack.pop()!; // Sacamos el último nodo de la pila
    let lastBookmarkCreatedId: string | undefined = undefined;
    if (!["0", "1", "2"].includes(node.id)) {
      // El nodo no es una carpeta raiz
      // El nodo no tiene hijos, es una hoja
      const bookmarkCreateArg: chrome.bookmarks.BookmarkCreateArg = {
        parentId: node.parentId,
        index: node.index,
        title: node.title,
        url: node.url,
      };

      await chrome.bookmarks
        .create(bookmarkCreateArg)
        .then((bookmark) => {
          lastBookmarkCreatedId = bookmark.id;
        })
        .catch((error) => {
          console.error("Failed to create bookmark", error);
          throw error;
        });

      // continue;
    } else {
      lastBookmarkCreatedId = node.id;
    }

    if (node.children && node?.children?.length > 0) {
      // El nodo tiene hijos, los agregamos a la pila para procesarlos posteriormente
      const nodesSortedByIndexAsc = node.children
        ?.sort((a, b) => b.index! - a.index!)
        .map((child) => {
          return {
            ...child,
            parentId: lastBookmarkCreatedId,
          };
        });

      stack.push(...(nodesSortedByIndexAsc || []));
    }
  }
}

export async function cleanBookmarks(): Promise<void> {
  return chrome.bookmarks.getTree().then((tree) => {
    if (!tree) {
      throw new Error("Failed to get bookmarks tree");
    }

    const stack = [...tree[0].children!]; // Creamos una copia del árbol

    while (stack.length > 0) {
      const node = stack.pop()!; // Sacamos el último nodo de la pila

      if (!["0", "1", "2"].includes(node.id)) {
        // El nodo no tiene hijos, es una hoja
        chrome.bookmarks.removeTree(node.id);
        continue;
      }

      if (node.children && node?.children?.length > 0) {
        // El nodo tiene hijos, los agregamos a la pila para procesarlos posteriormente
        stack.push(...node.children);
      }
    }
  });
}
