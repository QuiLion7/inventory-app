import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Table() {
  return (
    <Card className="mt-12 flex flex-col shadow-none poppins border-none">
      <CardHeader className="flex justify-between p-2">
        <div className="flex justify-between items-center">
          <div className="">
            <CardTitle className="font-bold text-xl">Produtos</CardTitle>
            <p className="text-sm text-slate-600">30 produtos</p>
          </div>
          <Button>Add Produto</Button>
        </div>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
}
