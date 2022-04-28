func sumarFila(M1: [Int], M2: [Int]) async -> [Int] {
    var M = M1.map { $0 }
    for i in M1.indices {
        M[i] = M1[i] + M2[i]
    }
    return M
}

func sumarMatriz(M1: [[Int]], M2: [[Int]]) async -> [[Int]] {
    var M = M1.map { $0.map { $0 + M2[0][0] } }
    for i in M1.indices {
        M[i] = await sumarFila(M1: M1[i], M2: M2[i])
    }
    return M
}