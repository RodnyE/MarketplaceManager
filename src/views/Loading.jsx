
import View from "ui/View"
import Button from "ui/Button"
import LoaderSpinner from "ui/LoaderSpinner"

export default function LoadingView ({show}) {
    return (
      <View show={show}>
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
          <LoaderSpinner />
        </div>
      </View>
    )
}