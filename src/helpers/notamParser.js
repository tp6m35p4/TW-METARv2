// const typeRegex = /^A\d{4}\/\d{2} NOTAM([NRCS])\s{1,}Q/;
const typeRegex = /(A\d*\/\d*)\sNOTAM([NRCS])\s{1,2}(A\d*\/\d*)*\s*Q\)/;
const qualiferFieldsRegex = /Q\)\s(\w{4})\/(\w{5})\/([IV]{1,2})\/([NBOM]{1,4})\/([AEW]{1,3})\/(\d{3})\/(\d{3})\/(\w*)\s/;
const ARegex = /A\)/;
const BRegex = /B\)/;
export function parse(raw) {
    let type = raw.match(typeRegex).slice(1);
    let q = raw.match(qualiferFieldsRegex).slice(1)
    return {
        type: type,
        qulifer: q
    };
}