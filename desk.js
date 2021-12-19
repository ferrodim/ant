const DIGITS = '12345678'.split('');
const ALPHABET = 'abcdefgh'.split('');
const EMPTY_PIECE = ' ';

class Desk {
    constructor(fenString='') {
        this.pieces = [];
        if (fenString){
            this.setFEN(fenString);
        } else {
            for (let i=0;i<8;i++){
                this.pieces[i] = [];
                for (let j=0;j<8;j++){
                    this.pieces[i][j] = '';
                }
            }
        }
    }

    setFEN(fenString){
        let [fenPieces, activeColor, castling, enPassant, halfMove, fullMove] = fenString.split(' ');
        this.activeColor = activeColor; // b or w
        this.castling = castling;
        this.enPassant = enPassant;
        this.halfMove = parseInt(halfMove);
        this.fullMove = parseInt(fullMove);
        this.pieces = fenPieces.split('/').map(f => {
            let fenChars = f.split('');
            let row = [];
            for (let char of fenChars){
                if (DIGITS.includes(char)){
                    for (let i=0; i<char; i++){
                        row.push(' ');
                    }
                } else {
                    row.push(char);
                }
            }
            return row;
        });
    }

    toFEN(){
        let fenPieces = '';
        let emptyCounter = 0;
        let rows = [];
        for (let i=0;i<8; i++){
            let row = [];
            for (let j=0;j<8; j++){
                let a = this.pieces[i][j];
                if (a === EMPTY_PIECE){
                    emptyCounter++;
                } else {
                    if (emptyCounter){
                        row.push(emptyCounter);
                        emptyCounter = 0;
                    }
                    row.push(a);
                }
            }
            if (emptyCounter){
                row.push(emptyCounter);
                emptyCounter = 0;
            }

            rows.push(row.join(''));
        }
        fenPieces = rows.join('/');

        let ans = [fenPieces, this.activeColor, this.castling, this.enPassant, this.halfMove, this.fullMove].join(' ');

        return ans;
    }

    drawAscii(){
        let black = "▓";
        //let black = "▒";
        let white = '░';
        let ans = '';
        ans += "╔════════════════════════╗\n";
        for (let i=0;i<8; i++){
            let row = this.pieces[i];
            ans += '║';
            for (let j=0; j<8; j++){
                if (row[j] !== ' '){
                    ans += '['+ row[j]+"]";
                } else {
                    let color = (i+j)%2 ? white : black;
                    ans += '['+color+']';
                }
            }
            ans += "║\n";
        }

        ans += "╚════════════════════════╝";
        return ans;
    }

    getPiece(pos){
        let [x, y] = pos.split('');
        let xI = ALPHABET.indexOf(x);
        let yI = 8-y;
        return this.pieces[yI][xI];
    }

    setPiece(pos, type){
        let [x, y] = pos.split('');
        let xI = ALPHABET.indexOf(x);
        let yI = 8-y;
        this.pieces[yI][xI] = type;
    }

    removePiece(pos){
        this.setPiece(pos, ' ');
    }

    move(pos1, pos2){
        let piece = this.getPiece(pos1);
        let isPawnMove = (piece === 'p') || (piece === 'P');
        let isCaptureMove = (this.getPiece(pos2) !== EMPTY_PIECE);

        this.removePiece(pos1);
        this.setPiece(pos2, piece);
        if (this.activeColor === 'b'){
            this.activeColor = 'w';
            this.fullMove++;
        } else {
            this.activeColor = 'w';
        }

        if (isPawnMove || isCaptureMove){
            this.halfMove=0;
        } else {
            this.halfMove++;
        }
    }

    getPieces(){
        return this.pieces;
    }
}

module.exports = Desk;