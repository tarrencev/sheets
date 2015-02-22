module.exports = {
    getCellHash: function(cell) {
        return cell.get('x') + ':' + cell.get('y');
    }
}
