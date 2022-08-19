export const fetchBoard = (userId, boardId) => (
    $.ajax({
      method: 'GET',
      url: `/api/users/${userId}/board/${boardId}`
    })
);

export const fetchBoards = (userId) => (
    $.ajax({
      method: 'GET',
      url: `/api/users/${userId}/boards`
    })
);

export const createBoard = (board) => (
    $.ajax({
      method: 'POST',
      url: `/api/boards`,
      data: {board}
    })
)

export const updateBoard = (board) => (
    $.ajax({
      method: 'PATCH',
      url: `/api/boards/${board.id}`,
      data: {board}
    })
)

export const deleteBoard = (boardId) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/boards/${boardId}`,
      })
)

export const fetchBoardByName = (name) => (
  Promise.resolve($.ajax({
    method: 'GET',
    url: `/api/users/${userId}/boards/name/${name}`
  }))
)