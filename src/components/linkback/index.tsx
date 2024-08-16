'use client'
import React from "react";

export function Linkback() {
  return (
    <p className="mt-5">
      Retorne para para a <a className="font-bold underline" href="#" onClick={() => window.history.back()}>página anterior</a>
    </p>
  )
}