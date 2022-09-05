function formatActions(actions) {
  let tokenId = -1;
  actions.reverse();

  return (actions || []).map((action) => {
    tokenId += 1;
    return {
      tokenId,
      ...action,
      nftFormat: undefined,
    };
  });
}

module.exports = {
  formatActions,
};
